import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import WithAuthentication from "@/hocs/with-authentication";

import ClinicForm from "./_components/clinic-form";

const ClinicFormPage = async () => {
  return (
    <div>
      <WithAuthentication>
        <Dialog open={true}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar clínica</DialogTitle>
              <DialogDescription>
                Adicione uma clínica para continuar.
              </DialogDescription>
            </DialogHeader>
            <ClinicForm />
          </DialogContent>
        </Dialog>
      </WithAuthentication>
    </div>
  );
};

export default ClinicFormPage;
