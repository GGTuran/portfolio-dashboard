import Loading from "../Loading/Loading";
import { Toaster } from "react-hot-toast";
import AddProductModal from "./AddSkillModal";
import { useGetAllSkillsQuery } from "@/redux/features/skill/skillApi";
import SkillCard from "./SkillCard";

const SkillContainer = () => {
  // Fetching data through RTK Query
  const { data: skillsData, isLoading } = useGetAllSkillsQuery("", {
    pollingInterval: 40000,
  });

  const skills = skillsData?.data;

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
        {skills?.map((skill: JSX.IntrinsicAttributes & any) => (
          <SkillCard key={skill?._id} {...skill} />
        ))}
      </div>
    </div>
  );
};

export default SkillContainer;
