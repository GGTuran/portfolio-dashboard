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
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
} from "@/redux/features/project/projectApi";

const UpdateProjectModal = ({ id }: { id: string }) => {
  const { data: projectData } = useGetProjectByIdQuery(id);
  const project = projectData?.data;

  const [name, setName] = useState(project?.name || "");
  const [description, setDescription] = useState(project?.description || "");
  const [details, setDetails] = useState(project?.details || "");

  const [image, setImage] = useState<File | null>(null);

  const [updateProject, { isLoading }] = useUpdateProjectMutation();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Prepare the updated project data
    const updatedProductData = {
      name: name || project.name,
      description: description || project.description,
      details: details || project.details,
    };

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(updatedProductData));
      if (image) formData.append("image", image);

      await updateProject({ id: project._id, projectInfo: formData }).unwrap();

      toast.success("Product updated successfully!");
    } catch (error) {
      toast.error("Error updating project. Please try again.");
      console.error("Error updating project:", error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <Toaster />
      <Dialog>
        <DialogTrigger asChild>
          <button className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-500 transition-colors duration-300">
            Update Product
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
            <DialogDescription>Update the project details</DialogDescription>
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
                  placeholder={project?.name}
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
                  placeholder={project?.description}
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
                  placeholder={project?.details}
                  onChange={(e) => setDetails(e.target.value)}
                  id="details"
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

export default UpdateProjectModal;
