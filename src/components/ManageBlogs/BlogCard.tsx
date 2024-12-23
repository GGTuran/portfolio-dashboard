import { useDeleteBlogMutation } from "@/redux/features/blog/blogApi";
import toast, { Toaster } from "react-hot-toast";
import UpdateBlogModal from "./UpdateBlogModal";

const BlogCard = ({ _id, image, name, blog }: any) => {
  const [deleteBlog] = useDeleteBlogMutation();

  const removeBlog = () => {
    deleteBlog(_id);
    toast.success("Blog deleted successfully");
  };

  return (
    <main>
      <Toaster />
      <div className="rounded-2xl group relative block overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img
          src={image}
          alt="Blog Image"
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />

        <div className="relative border border-gray-100 p-6">
          <h3 className="mt-4 text-lg font-medium text-black dark:text-white">
            {name}
          </h3>

          <h3 className="mt-4 text-xl font-semibold text-black dark:text-white">
            {blog}
          </h3>

          <div className="mt-4 flex justify-between items-center">
            {/* Update Product Modal */}
            <UpdateBlogModal id={_id}></UpdateBlogModal>

            <button
              onClick={removeBlog}
              className="px-4 py-2 bg-red-300 text-black rounded-lg hover:bg-red-500 transition-colors duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogCard;
