import { useDeleteExperienceMutation } from "@/redux/features/experience/experienceApi";
import toast, { Toaster } from "react-hot-toast";
import UpdateExperienceModal from "./UpdateExperienceModal";

const ExperienceCard = ({
  _id,
  title,
  company,
  employmentType,
  startDate,
  endDate,
  duration,
  location,
  description,
}: any) => {
  const [deleteExperience] = useDeleteExperienceMutation();

  const removeExperience = () => {
    deleteExperience(_id);
    toast.success("Experience deleted successfully");
  };

  return (
    <main>
      <Toaster />
      <div className="rounded-2xl group relative block overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative border border-gray-100 p-6">
          <h3 className="mt-4 text-lg font-medium text-black dark:text-white">
            {title}
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
            <UpdateExperienceModal id={_id}></UpdateExperienceModal>

            <button
              onClick={removeExperience}
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

export default ExperienceCard;
