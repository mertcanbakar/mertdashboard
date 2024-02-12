import { useEffect, useState } from "react";
import SearchSection from "../../components/SearchSection";
import TableGrid from "../../components/TableGrid";
import MainLayout from "../../components/layouts/mainLayout/MainLayout";
import ProductDialog from "./ProductDialog";
import { useTranslation } from "react-i18next";
import { IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SneakBar from "../../components/sneakbar/SneakBar";

function Products() {
  const { t } = useTranslation();
  const [loader, setLoader] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 101,
      productName: "Ülker Çikolatalı Gofret",
      productDescription: "Sütlü, kakaolu çikolatalı gofret",
      stock: 300,
      type: "unit",
      category: "food-and-beverages",
      price: 10.5,
      manufacturer: "Ülker",
    },
    {
      id: 102,
      productName: "Pınar Süt",
      productDescription: "Pastörize süt",
      stock: 500,
      type: "unit",
      category: "food-and-beverages",
      price: 3,
      manufacturer: "Pınar",
    },
    {
      id: 104,
      productName: "Domestos Çamaşır Suyu",
      productDescription: "Dezenfekte edici çamaşır suyu",
      stock: 100,
      type: "unit",
      category: "cleaning-equipment",
      price: 8,
      manufacturer: "Domestos",
    },
    {
      id: 105,
      productName: "Colgate Diş Macunu",
      productDescription: "Florür içeren diş macunu",
      stock: 150,
      type: "unit",
      category: "health-and-beauty",
      price: 6,
      manufacturer: "Colgate",
    },
    {
      id: 106,
      productName: "Torku Un",
      productDescription: "Ekmeklik un",
      stock: 2000,
      type: "unit",
      category: "food-and-beverages",
      price: 5,
      manufacturer: "Torku",
    },
    {
      id: 107,
      productName: "Coca Cola",
      productDescription: "Kafeinli gazlı içecek",
      stock: 200,
      type: "unit",
      category: "food-and-beverages",
      price: 4,
      manufacturer: "Coca Cola Company",
    },
  ]);
  const OpenModal = (data) => {
    setIsOpen(true);
    setData(data);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 100, flex: 0.5 },
    {
      field: "productName",
      headerName: `${t("product-name")}`,
      width: 100,
      flex: 1.5,
    },
    {
      field: "productDescription",
      headerName: `${t("product-description")}`,
      width: 100,
      flex: 1.5,
    },
    {
      field: "stock",
      headerName: `${t("stock")}`,
      type: "number",
      width: 100,
      flex: 0.75,
      valueGetter: (params) => {
        return (
          params?.row.stock +
          " " +
          (params?.row.type === "unit"
            ? t(params?.row.type)
            : params?.row.type === "kilogram"
            ? "Kg"
            : "Gr")
        );
      },
    },
    {
      field: "category",
      headerName: `${t("category")}`,
      width: 100,
      flex: 0.75,
      valueGetter: (params) => {
        return params.row?.category ? t(params.row.category) : "";
      },
    },
    {
      field: "price",
      headerName: `${t("price")}`,
      type: "number",
      width: 100,
      flex: 0.75,
      valueGetter: (params) => {
        return params.row?.price?.toFixed(2) || +" " + "TL";
      },
    },
    {
      field: "manufacturer",
      headerName: `${t("manufacturer")}`,
      width: 100,
      flex: 1,
    },
    {
      field: "action",
      headerName: "",
      type: "number",
      width: 100,
      flex: 0.5,
      renderCell: (cellValues) => (
        <Stack direction="row" spacing={-1}>
          <ProductDialog
            buttonName="edit"
            products={products}
            setProducts={setProducts}
            setLoader={setLoader}
            data={cellValues.row}
          />
          <IconButton color="error" onClick={() => OpenModal(cellValues.row)}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];
  useEffect(() => {
    if (loader) setLoader(false);
  }, [products]);
  return (
    <MainLayout>
      {isOpen && (
        <SneakBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={data}
          items={products}
          setItems={setProducts}
          type="product"
        />
      )}
      <div className="w-full overflow-auto bg-white mb-8 p-6 rounded-2xl border border-[#90caf975]">
        <h2 className="text-xl font-medium">{t("products")}</h2>
      </div>
      <div className="w-full h-[600px] flex flex-col bg-white p-6 rounded-2xl border border-[#90caf975]">
        <div className="pb-2 mb-2 border-b flex justify-between">
          <SearchSection />
          <ProductDialog
            buttonName="new-product"
            products={products}
            setProducts={setProducts}
            setLoader={setLoader}
          />
        </div>
        {loader ? (
          <div className="w-full flex-1  flex justify-center items-center">
            <h1>Yükleniyor</h1>
          </div>
        ) : (
          <TableGrid
            rows={products}
            columns={columns}
            rowCount={10}
            paginationMode="server"
          />
        )}
      </div>
    </MainLayout>
  );
}

export default Products;
