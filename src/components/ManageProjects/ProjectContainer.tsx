import Loading from "../Loading/Loading";
import { Toaster } from "react-hot-toast";
import AddProductModal from "./AddProjectModal";
import ManageCard from "./ManageCard";
import { useGetAllProjectsQuery } from "@/redux/features/project/projectApi";

const ProjectContainer = () => {
  // Fetching data through RTK Query
  const { data: projectsData, isLoading } = useGetAllProjectsQuery("", {
    pollingInterval: 40000,
  });

  const projects = projectsData?.data;

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
        {projects?.map((project: JSX.IntrinsicAttributes & any) => (
          <ManageCard key={project._id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectContainer;
