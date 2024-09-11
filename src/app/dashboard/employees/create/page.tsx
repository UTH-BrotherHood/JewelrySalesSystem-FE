import { CreateEmployeeForm } from "@/components/employees/CreateEmployeeForm";

function CreateEmployeePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Employee</h1>
      <CreateEmployeeForm />
    </div>
  );
}

export default CreateEmployeePage;
