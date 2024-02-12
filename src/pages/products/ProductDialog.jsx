/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import DialogForm from "../../components/modal/DialogForm";
import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProductDialog({
  buttonName,
  data,
  products,
  setProducts,
  setLoader,
}) {
  const { t } = useTranslation();
  const [rowID, setRowID] = useState(108);
  const categories = [
    { id: 1, value: "food-and-beverages" },
    {
      id: 2,
      value: "technology-and-electronics",
    },
    { id: 3, value: "home-and-garden" },
    { id: 4, value: "fashion-and-Clothing" },
    { id: 5, value: "health-and-beauty" },
    {
      id: 6,
      value: "automotive-and-tools",
    },
    {
      id: 7,
      value: "cleaning-equipment",
    },
  ];
  const types = [
    {
      id: 1,
      title: "unit",
    },
    {
      id: 1,
      title: "kilogram",
    },
    {
      id: 1,
      title: "gram",
    },
    {
      id: 1,
      title: "liter",
    },
  ];
  const formik = useFormik({
    initialValues: data ?? {
      productName: null,
      productDescription: null,
      stock: null,
      type: "unit",
      category: "food-and-beverages",
      price: null,
      manufacturer: null,
    },
    onSubmit: (values) => {
      console.log(values);
      const updatedValues = { ...values, id: rowID };
      setProducts([...products, updatedValues]);
      setLoader(true);
      setRowID(rowID + 1);
      formik.resetForm();
      toast.success(t("success-create-product"), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });
  const handleEdit = (values) => {
    const updatedData = products.map((prod) => {
      if (prod.id === values.id) {
        return {
          ...prod,
          ...values,
        };
      }
      return prod;
    });
    setProducts(updatedData);
    setLoader(true);
    toast.success(t("success-edit-product"), {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    formik.resetForm();
  };
  const cancelForm = () => {
    formik.resetForm();
  };
  return (
    <DialogForm
      buttonName={buttonName}
      processType={buttonName}
      modalTitle={buttonName === "edit" ? "edit-product" : "create-product"}
      saveClick={formik.handleSubmit}
      editClick={() => handleEdit(formik.values)}
      cancelClick={cancelForm}
    >
      <div className="flex flex-col gap-y-3">
        <TextField
          id="productName"
          name="productName"
          size="small"
          label={t("product-name")}
          fullWidth
          value={formik.values.productName}
          onChange={formik.handleChange}
        />
        <TextField
          id="productDescription"
          name="productDescription"
          size="small"
          label={t("product-description")}
          fullWidth
          value={formik.values.productDescription}
          onChange={formik.handleChange}
        />
        <div className="w-full flex gap-x-2">
          <TextField
            id="stock"
            name="stock"
            size="small"
            type="number"
            label={t("stock")}
            fullWidth
            value={formik.values.stock}
            onChange={formik.handleChange}
          />
          <FormControl fullWidth size="small">
            <InputLabel>{t("type")}</InputLabel>
            <Select
              id="type"
              value={formik.values.type}
              label={t("type")}
              onChange={(event) => {
                formik.setFieldValue("type", event.target.value);
              }}
            >
              {types.map((type) => (
                <MenuItem key={type.id} value={type.title}>
                  {t(type.title)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <FormControl fullWidth size="small">
          <InputLabel>{t("category")}</InputLabel>
          <Select
            id="category"
            value={formik.values.category}
            label={t("category")}
            onChange={(event) => {
              formik.setFieldValue("category", event.target.value);
            }}
          >
            {categories.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {t(option.value)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="price"
          name="price"
          size="small"
          type="number"
          label={t("price")}
          fullWidth
          value={formik.values.price}
          onChange={formik.handleChange}
        />
        <TextField
          id="manufacturer"
          name="manufacturer"
          size="small"
          label={t("manufacturer")}
          fullWidth
          value={formik.values.manufacturer}
          onChange={formik.handleChange}
        />
      </div>
    </DialogForm>
  );
}
