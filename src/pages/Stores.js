import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { useContext, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

import { useTranslation } from "react-i18next";
import { SidebarContext } from "context/SidebarContext";
import StoreServices from "services/StoreServices";
import useAsync from "hooks/useAsync";
import useToggleDrawer from "hooks/useToggleDrawer";
import useFilter from "hooks/useFilter";
import PageTitle from "components/Typography/PageTitle";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import MainDrawer from "components/drawer/MainDrawer";
import CouponDrawer from "components/drawer/CouponDrawer";
import TableLoading from "components/preloader/TableLoading";
import CheckBox from "components/form/CheckBox";
import StoreTable from "components/store/StoreTable";
import NotFound from "components/table/NotFound";
import  UploadManyTwo  from 'components/common/UploadManyTwo';

const Coupons = () => {
  const { toggleDrawer, lang } = useContext(SidebarContext);
  const { data, loading } = useAsync(StoreServices.getAllStores);
  // console.log('data',data)
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const { allId, serviceId, handleDeleteMany, handleUpdateMany } = useToggleDrawer();

  const {
    handleSubmitCoupon,
    couponRef,
    dataTable,
    serviceData,
    totalResults,
    resultsPerPage,
    handleChangePage,
    handleSelectFile,
    filename,
    isDisabled,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useFilter(data);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t("Stores")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title="Selected Coupon" />
      <BulkActionDrawer ids={allId} title="Coupons" />

      <MainDrawer>
        <CouponDrawer id={serviceId} />
      </MainDrawer>



      {loading ? (
        // <Loading loading={loading} />
        <TableLoading row={12} col={8} width={140} height={20} />
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>
                {t("Sr no")}
                </TableCell>
                <TableCell>{t("Storename")}</TableCell>
                <TableCell>{t("Address")}</TableCell>
                <TableCell>{t("store Timing")}</TableCell>
                <TableCell>{t("store Manager")}</TableCell>
                <TableCell className="text-center">{t("catPublishedTbl")}</TableCell>          
                <TableCell>{t("CoupTblStatus")}</TableCell>
                <TableCell className="text-right">{t("CoupTblActions")}</TableCell>
              </tr>
            </TableHeader>
            <StoreTable lang={lang} isCheck={isCheck} coupons={dataTable} setIsCheck={setIsCheck} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no Stores right now." />
      )}
    </>
  );
};

export default Coupons;


