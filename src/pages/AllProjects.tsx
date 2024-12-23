import { useGetAllProjectsQuery } from "@/redux/features/project/projectApi";

const AllProducts = () => {
  // Fetch products
  const { data: projectsData } = useGetAllProjectsQuery("");

  // Products data
  const projects = projectsData?.data;
  // console.log(projects[0].name, "name");

  return (
    <div className="m-10 space-y-6">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* {projects?.map((project: any) => (
          <ProjectCard project={project} key={project?._id} />
        ))} */}
        <h1>gg</h1>
      </div>
    </div>
  );
};

export default AllProducts;
