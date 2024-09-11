import { CreateCategoryForm } from "@/components/categories/CreateCategoryForm";

function CreateCategoryPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tạo danh mục mới</h1>
      <CreateCategoryForm />
    </div>
  );
}

export default CreateCategoryPage;
