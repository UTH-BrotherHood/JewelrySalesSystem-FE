import { CreateCustomerForm } from "@/components/customers/CreateCustomerForm";

function CreateCustomerPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Customer</h1>
      <CreateCustomerForm />
    </div>
  );
}

export default CreateCustomerPage;
