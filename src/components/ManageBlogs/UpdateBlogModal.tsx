import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../Loading/Loading";
import {
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from "@/redux/features/blog/blogApi";

const UpdateBlogModal = ({ id }: { id: string }) => {
  const { data: blogData } = useGetBlogByIdQuery(id);
  const data = blogData?.data;

  const [name, setName] = useState(data?.name || "");
  const [blog, setBLog] = useState(data?.blog || "");

  const [image, setImage] = useState<File | null>(null);

  const [updateProject, { isLoading }] = useUpdateBlogMutation();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Prepare the updated blog data
    const updatedProductData = {
      name: name || data.name,
      blog: blog || data.blog,
    };

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(updatedProductData));
      if (image) formData.append("image", image);

      await updateProject({ id: data?._id, blogInfo: formData }).unwrap();

      toast.success("Product updated successfully!");
    } catch (error) {
      toast.error("Error updating blog. Please try again.");
      console.error("Error updating blog:", error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <Toaster />
      <Dialog>
        <DialogTrigger asChild>
          <button className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300">
            Update Blog
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Blog</DialogTitle>
            <DialogDescription>Update the blog details</DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="grid gap-4 py-4">
              {/* Name Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  value={name}
                  placeholder={data?.name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  className="col-span-3"
                />
              </div>

              {/* Blog Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="blog" className="text-right">
                  Blog
                </Label>
                <Input
                  value={blog}
                  placeholder={data?.blog}
                  onChange={(e) => setBLog(e.target.value)}
                  id="blog"
                  className="col-span-3"
                />
              </div>

              {/* Image Upload Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <Input
                  type="file"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                  id="image"
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <DialogClose asChild>
                <button
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateBlogModal;
