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
import { useAddProjectMutation } from "@/redux/features/project/projectApi";

const AddProjectModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [addProject, { isLoading }] = useAddProjectMutation();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !image) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Prepare the product data
    const projectData = {
      name,
      description,
      details,
      image,
    };

    // console.log(projectData, "product data");
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(projectData));
      formData.append("image", image);

      await addProject(formData).unwrap();

      // Reset form after successful submission
      setName("");
      setDescription("");
      setDetails("");
      setImage(null);
      toast.success("Project added successfully!");
    } catch (error) {
      toast.error("Error adding project. Please try again.");
      console.error("Error adding project:", error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <Toaster />
      <Dialog>
        <DialogTrigger asChild>
          <button className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300">
            Add Project
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Project</DialogTitle>
            <DialogDescription>Add a new project</DialogDescription>
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
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  className="col-span-3"
                />
              </div>

              {/* Description Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  className="col-span-3"
                />
              </div>

              {/* details Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Details
                </Label>
                <Input
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  id="price"
                  className="col-span-3"
                />
              </div>

              {/* Image Upload Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <Input
                  type="file"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                  id="image"
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

export default AddProjectModal;
