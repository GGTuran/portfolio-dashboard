// /* eslint-disable prefer-const */
// import { useState } from "react";
// import { Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import {
//   useAddCategoryMutation,
//   useDeleteCategoryMutation,
//   useGetAllCategoryQuery,
//   useUpdateCategoryMutation,
// } from "@/redux/features/category/categoryApi";
// import toast, { Toaster } from "react-hot-toast";

// interface Category {
//   _id?: string;
//   name: string;
//   image?: File | null;
// }

// export default function CategoryManagement() {
//   const { data: categoriesData, isLoading } = useGetAllCategoryQuery("");
//   const [addCategory] = useAddCategoryMutation();
//   const [updateCategory] = useUpdateCategoryMutation();
//   const [deleteCategory] = useDeleteCategoryMutation();

//   const categories = categoriesData?.data;

//   const [newCategory, setNewCategory] = useState<Category>({
//     name: "",
//     image: null,
//   });
//   const [editingCategory, setEditingCategory] = useState<Category | null>(null);

//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

//   const handleAddCategory = async () => {
//     if (newCategory.name.trim() && newCategory.image) {
//       try {
//         const formData = new FormData();
//         formData.append("data", JSON.stringify(newCategory));
//         formData.append("image", newCategory.image);

//         await addCategory(formData).unwrap();
//         toast.success("Category added successfully");
//         setNewCategory({ name: "", image: null }); // Reset form
//         setIsAddDialogOpen(false);
//       } catch (error) {
//         toast.error("Error adding category:");
//         console.error("Error adding category:", error);
//       }
//     }
//   };

//   const handleEditCategory = async () => {
//     if (editingCategory && editingCategory.name.trim()) {
//       try {
//         const formData = new FormData();
//         formData.append("data", JSON.stringify({ name: editingCategory.name }));
//         if (editingCategory.image) {
//           formData.append("image", editingCategory.image);
//         }

//         // Debugging FormData content
//         for (let pair of formData.entries()) {
//           console.log(`${pair[0]}: ${pair[1]}`);
//         }

//         await updateCategory({
//           id: editingCategory._id,
//           categoryInfo: formData,
//         }).unwrap();
//         setEditingCategory(null);
//         setIsEditDialogOpen(false);
//         toast.success("Category updated successfully");
//       } catch (error) {
//         toast.error("Error updating category");
//         console.error("Error updating category:", error);
//       }
//     }
//   };

//   const handleDeleteCategory = async (id: string) => {
//     try {
//       console.log(id, "id");
//       await deleteCategory(id);
//       toast.success("Deleted category");
//     } catch (error) {
//       toast.error("Error deleting category");
//       console.error("Error deleting category:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto py-10">
//       <Toaster />
//       <h1 className="text-2xl font-bold mb-5">Category Management</h1>
//       <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//         <DialogTrigger asChild>
//           <Button className="mb-5">
//             <Plus className="mr-2 h-4 w-4" /> Add Category
//           </Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Add Category</DialogTitle>
//             <DialogDescription>
//               Add a new category to your product catalog.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <Input
//               id="name"
//               placeholder="Category Name"
//               value={newCategory.name}
//               onChange={(e) =>
//                 setNewCategory({ ...newCategory, name: e.target.value })
//               }
//             />

//             <Input
//               id="image"
//               type="file"
//               accept="image/*"
//               onChange={(e) =>
//                 setNewCategory({
//                   ...newCategory,
//                   image: e.target.files?.[0] || null,
//                 })
//               }
//             />
//           </div>
//           <DialogFooter>
//             <Button type="submit" onClick={handleAddCategory}>
//               Add Category
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//       {isLoading ? (
//         <p>Loading categories...</p>
//       ) : (
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Name</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {categories?.map((category: Category) => (
//               <TableRow key={category._id}>
//                 <TableCell>{category.name}</TableCell>
//                 <TableCell>
//                   <Dialog
//                     open={isEditDialogOpen}
//                     onOpenChange={setIsEditDialogOpen}
//                   >
//                     <DialogTrigger asChild>
//                       <Button
//                         variant="outline"
//                         className="mr-2"
//                         onClick={() => {
//                           setEditingCategory(category);
//                           setIsEditDialogOpen(true);
//                         }}
//                       >
//                         Edit
//                       </Button>
//                     </DialogTrigger>
//                     <DialogContent className="sm:max-w-[425px]">
//                       <DialogHeader>
//                         <DialogTitle>Edit Category</DialogTitle>
//                         <DialogDescription>
//                           Make changes to the category.
//                         </DialogDescription>
//                       </DialogHeader>
//                       <div className="grid gap-4 py-4">
//                         <Input
//                           id="edit-name"
//                           placeholder="Category Name"
//                           value={editingCategory?.name || ""}
//                           onChange={(e) =>
//                             setEditingCategory(
//                               editingCategory
//                                 ? { ...editingCategory, name: e.target.value }
//                                 : null
//                             )
//                           }
//                         />

//                         <Input
//                           id="edit-image"
//                           type="file"
//                           accept="image/*"
//                           onChange={(e) =>
//                             setEditingCategory(
//                               editingCategory
//                                 ? {
//                                     ...editingCategory,
//                                     image: e.target.files?.[0] || null,
//                                   }
//                                 : null
//                             )
//                           }
//                         />
//                       </div>
//                       <DialogFooter>
//                         <Button type="submit" onClick={handleEditCategory}>
//                           Save Changes
//                         </Button>
//                       </DialogFooter>
//                     </DialogContent>
//                   </Dialog>
//                   <AlertDialog>
//                     <AlertDialogTrigger asChild>
//                       <Button variant="destructive">Delete</Button>
//                     </AlertDialogTrigger>
//                     <AlertDialogContent>
//                       <AlertDialogHeader>
//                         <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//                         <AlertDialogDescription>
//                           This action cannot be undone. This will permanently
//                           delete the category.
//                         </AlertDialogDescription>
//                       </AlertDialogHeader>
//                       <AlertDialogFooter>
//                         <AlertDialogCancel>Cancel</AlertDialogCancel>
//                         <AlertDialogAction
//                           onClick={() => handleDeleteCategory(category._id!)}
//                         >
//                           Delete
//                         </AlertDialogAction>
//                       </AlertDialogFooter>
//                     </AlertDialogContent>
//                   </AlertDialog>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       )}
//     </div>
//   );
// }
