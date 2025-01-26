interface WorkBlockDialogProps {
  id: number;
  open?: boolean;
  onClose?: () => void;
}

function WorkBlockDialog(props: WorkBlockDialogProps) {
  return (
    <dialog className="modal" role="dialog" open={props.open} onClose={props.onClose}>
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input type="text" required className="input input-bordered w-full" />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <textarea required className="textarea textarea-bordered"></textarea>
          </label>
          <label className="form-control w-full max-w-16">
            <div className="label">
              <span className="label-text">Days</span>
            </div>
            <input type="number" required min={1} className="input input-bordered w-full" />
          </label>
          <div className="flex flex-row">
            <div className="flex-grow"></div>
            <button className="btn">Save</button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default WorkBlockDialog;
