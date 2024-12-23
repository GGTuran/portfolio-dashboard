import Loading from "../Loading/Loading";
import { Toaster } from "react-hot-toast";
import AddProductModal from "./AddBlogModal";
import ManageCard from "./BlogCard";
import { useGetAllBlogsQuery } from "@/redux/features/blog/blogApi";

const BlogContainer = () => {
  // Fetching data through RTK Query
  const { data: blogsData, isLoading } = useGetAllBlogsQuery("", {
    pollingInterval: 40000,
  });

  const blogs = blogsData?.data;

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="m-10">
      <Toaster />

      {/* Add Product Button */}
      <div className="flex justify-between mb-5">
        <AddProductModal />
      </div>

      {/* Manage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {blogs?.map((blog: JSX.IntrinsicAttributes & any) => (
          <ManageCard key={blog._id} {...blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogContainer;
