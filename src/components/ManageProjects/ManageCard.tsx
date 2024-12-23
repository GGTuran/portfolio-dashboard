import toast, { Toaster } from "react-hot-toast";
import UpdateProductModal from "./UpdateProjectModal";

import { useDeleteProjectMutation } from "@/redux/features/project/projectApi";

const ManageCard = ({ _id, image, name, description, details }: any) => {
  const [deleteProject] = useDeleteProjectMutation();

  const removeProject = () => {
    deleteProject(_id);
    toast.success("Project deleted successfully");
  };

  return (
    <main>
      <Toaster />
      <div className="rounded-2xl group relative block overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img
          src={image}
          alt="Product Image"
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />

        <div className="relative border border-gray-100 p-6">
          <h3 className="mt-4 text-lg font-medium text-black dark:text-white">
            {name}
          </h3>

          <h3 className="mt-4 text-xl font-semibold text-black dark:text-white">
            {description}
          </h3>

          <div className="mt-4 flex justify-between items-center">
            <div>
              {/* <p className="text-black font-medium dark:text-white">{details}</p> */}
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            {/* Update Product Modal */}
            <UpdateProductModal id={_id}></UpdateProductModal>

            <button
              onClick={removeProject}
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

export default ManageCard;
