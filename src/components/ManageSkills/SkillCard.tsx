import { useDeleteSkillMutation } from "@/redux/features/skill/skillApi";
import toast, { Toaster } from "react-hot-toast";
import UpdateSkillModal from "./UpdateSkillModal";

const SkillCard = ({ _id, name }: any) => {
  const [deleteSkill] = useDeleteSkillMutation();

  const removeSkill = () => {
    deleteSkill(_id);
    toast.success("Skill deleted successfully");
  };

  return (
    <main>
      <Toaster />
      <div className="rounded-2xl group relative block overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative border border-gray-100 p-6">
          <h3 className="mt-4 text-lg font-medium text-black dark:text-white">
            {name}
          </h3>

          <div className="mt-4 flex justify-between items-center">
            {/* Update Product Modal */}
            {/* <UpdateSkillModal id={_id}></UpdateSkillModal> */}

            <button
              onClick={removeSkill}
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

export default SkillCard;
