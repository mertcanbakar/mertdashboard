/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

export default function SneakBar({
  isOpen,
  setIsOpen,
  data,
  type,
  items,
  setItems,
}) {
  const { t } = useTranslation();
  function closeModal() {
    setIsOpen(false);
  }
  const deleteHandle = () => {
    const updateItems = items.filter((item) => item.id !== data.id);
    setItems(updateItems);
    setIsOpen(false);
  };
  let title;
  let message;
  switch (type) {
    case "product":
      title = "delete-product";
      message = (
        <p className="text-sm text-gray-500">
          <span className="font-bold">{data.productName}</span>
          {" adlı ürünü silmek istediğinizden emin misiniz?"}
        </p>
      );
      break;
    case "user":
      title = "delete-user";
      message = (
        <p className="text-sm text-gray-500">
          <span className="font-bold">
            {data.name} {data.surname}
          </span>
          {" adlı kullanıcıyı silmek istediğinizden emin misiniz?"}
        </p>
      );
      break;
    case "branch":
      title = "delete-branch";
      message = (
        <p className="text-sm text-gray-500">
          <span className="font-bold">{data.branchName}</span>
          {"'ni silmek istediğinizden emin misiniz?"}
        </p>
      );
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg mb-4 font-medium leading-6 text-gray-900"
                  >
                    {t(title)}
                  </Dialog.Title>
                  <div className="mt-2">{message}</div>

                  <div className="w-full pt-3 mt-3 flex items-center justify-end gap-x-2">
                    <button
                      type="button"
                      className="w-16 inline-flex justify-center rounded-md border border-transparent bg-transparent px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      {t("cancel")}
                    </button>
                    <button
                      type="button"
                      onClick={deleteHandle}
                      className="w-16 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      {t("delete")}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
