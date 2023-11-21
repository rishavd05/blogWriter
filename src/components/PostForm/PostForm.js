import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import RTE from "../RTE";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import bucketService from "../../AppWrite/bucket_service";
import databaseService from "../../AppWrite/database_service";

export default function PostForm({ post }) {
  const { register, handleSubmit, control, watch, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);
  const [loader, setLoader] = React.useState(false);

  const submit = async (data) => {
    setLoader(true);

    if (post) {
      const file = data.image[0]
        ? await bucketService.uploadFile(data.image[0])
        : null;

      if (file) {
        bucketService.deleteFile(post.featuredImage);
      }

      const updatedPost = await databaseService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (updatedPost) {
        navigate(`/post/${updatedPost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? await bucketService.uploadFile(data.image[0])
        : null;
      if (file) {
        const fileId = file.$id;
        const newPost = await databaseService.createPost({
          ...data,
          userId: userData.$id,
          featuredImage: String(fileId),
        });

        if (newPost) {
          navigate(`/post/${newPost.$id}`);
        }
      }
    }

    setLoader(false);
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <>
      {loader && (
        <div
          className="flex justify-center items-center h-screen"
          style={{
            top: "20px",
            width: "100%",
            position: "fixed",
            zIndex: "999",
          }}
        >
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-900"></div>
        </div>
      )}
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />
          <input
            readOnly
            label="Slug :"
            placeholder="Slug"
            value={post ? post.$id : ""}
            className="mb-4 px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-1/3 px-2">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={bucketService.previewFile(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
}
