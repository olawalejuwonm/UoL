//This will ask  the user’s confirmation with a confirm modal before the delete operation
//The function below will trigger the confirm modal.
function handleDelete() {
  const deleteDeviceModal = new bootstrap.Modal(
    document.getElementById("delete-device-modal")
  );
  deleteDeviceModal.show();
}
