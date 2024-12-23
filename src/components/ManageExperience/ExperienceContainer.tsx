import { useGetAllExperiencesQuery } from "@/redux/features/experience/experienceApi";
import Loading from "../Loading/Loading";
import { Toaster } from "react-hot-toast";
import ExperienceCard from "./ExperienceCard";
import AddExperienceModal from "./AddExperienceModal";

const ExperienceContainer = () => {
  // Fetching data through RTK Query
  const { data: experienceData, isLoading } = useGetAllExperiencesQuery("", {
    pollingInterval: 40000,
  });

  const experiences = experienceData?.data;

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

      {/* Add Button */}
      <div className="flex justify-between mb-5">
        <AddExperienceModal />
      </div>

      {/* Manage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {experiences?.map((experience: JSX.IntrinsicAttributes & any) => (
          <ExperienceCard key={experience._id} {...experience} />
        ))}
      </div>
    </div>
  );
};

export default ExperienceContainer;
