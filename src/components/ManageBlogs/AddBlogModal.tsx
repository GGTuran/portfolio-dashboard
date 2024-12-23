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
import { useAddBlogMutation } from "@/redux/features/blog/blogApi";

const AddBlogModal = () => {
  const [name, setName] = useState("");
  const [blog, setBlog] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [addBlog, { isLoading }] = useAddBlogMutation();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !image) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Prepare the product data
    const blogData = {
      name,
      blog,
      image,
    };

    // console.log(blogData, "product data");
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(blogData));
      formData.append("image", image);

      await addBlog(formData).unwrap();

      // Reset form after successful submission
      setName("");
      setBlog("");
      setImage(null);
      toast.success("Blog added successfully!");
    } catch (error) {
      toast.error("Error adding blog. Please try again.");
      console.error("Error adding blog:", error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <Toaster />
      <Dialog>
        <DialogTrigger asChild>
          <button className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300">
            Add Blog
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Blog</DialogTitle>
            <DialogDescription>Add a new blog</DialogDescription>
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
                  onChange={(e) => setBlog(e.target.value)}
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

export default AddBlogModal;
