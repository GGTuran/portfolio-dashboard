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
import {
  useGetSkillByIdQuery,
  useUpdateSkillMutation,
} from "@/redux/features/skill/skillApi";

const UpdateSkillModal = ({ id }: { id: string }) => {
  const { data: skillData } = useGetSkillByIdQuery(id);
  const data = skillData?.data;

  const [name, setName] = useState(data?.name || "");

  const [updateSkill, { isLoading }] = useUpdateSkillMutation();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Prepare the updated blog data
    const updatedSkillData = {
      name: name || data.name,
    };

    try {
      await updateSkill({
        id: data?._id,
        skillInfo: updatedSkillData,
      }).unwrap();

      toast.success("Skill updated successfully!");
    } catch (error) {
      toast.error("Error updating skill. Please try again.");
      console.error("Error updating skill:", error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <Toaster />
      <Dialog>
        <DialogTrigger asChild>
          <button className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300">
            Update Skill
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Skill</DialogTitle>
            <DialogDescription>Update the skill details</DialogDescription>
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
                  placeholder={data?.name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
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

export default UpdateSkillModal;
