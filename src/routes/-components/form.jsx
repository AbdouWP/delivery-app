import { FieldSet } from "@/components/ui/field";

export function Form({ form = {}, onSubmit, className = "", children }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
        onSubmit();
      }}
      className={className}
    >
      <FieldSet>{children}</FieldSet>
    </form>
  );
}
