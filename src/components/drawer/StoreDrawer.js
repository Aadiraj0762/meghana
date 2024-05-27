import { Input } from "@windmill/react-ui";
import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import InputValue from "components/form/InputValue";
import LabelArea from "components/form/LabelArea";
import SwitchToggle from "components/form/SwitchToggle";
import SwitchToggleFour from "components/form/SwitchToggleFour";
import Uploader from "components/image-uploader/Uploader";
import useStoreSubmit from "hooks/useStoreSubmit";
import { t } from "i18next";
import { Scrollbars } from "react-custom-scrollbars-2";
import { MultiSelect } from "react-multi-select-component";
import { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { SidebarContext } from "context/SidebarContext";
import { notifyError, notifySuccess } from "utils/toast";
import StoreServices from "services/StoreServices";
import Title from "components/form/Title";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StoreRevDrawer = ({ id }) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [formData, setFormData] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [language, setLanguage] = useState(lang);
  const [resData, setResData] = useState({});
  const [published, setPublished] = useState(false);
  const [discountType, setDiscountType] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [status, setStatus] = useState(null);
  const [title, setDfd] = useState(null);
  const [addressLine, setFfd] = useState(null);
  const [area, setVfd] = useState(null);
  const [gst, d] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "products") {
      const selectedOptions = Array.from(e.target.selectedOptions);
      const selectedProductsData = selectedOptions.map((option) => {
        const product = products.find((prod) => prod._id === option.value);
        return { value: option.value, label: product ? product.title.en : "" };
      });
      setSelectedProducts(selectedProductsData);
    } else if (name === "state") {
      setState(value);
    } else if (name === "pinCode") {
      setPinCode(value);
    } else if (name === "city") {
      setCity(value);
    }
    setFormData({ ...formData, [name]: value });
  };
  
  const onSubmit = async (data) => {
    const { title, addressLine, area, city, state, pinCode, status, gst } =
      data;

    try {
      let StoreData = {
        StoreName: title,
        addressLine,
        area,
        city,
        state,
        pinCode,
        status,
        gst,
      };
      if (id) {
        const res = await StoreServices.updateStore(id, StoreData);
        setIsUpdate(true);
        notifySuccess("Store updated successfully");
        // toast.success("Store updated successfully");
        closeDrawer();
      } else {
        const res = await StoreServices.addStore(StoreData);
        setIsUpdate(true);
        notifySuccess("Store created");
        // toast.success("Store created");

        // Close the drawer on successful operation
        closeDrawer();
      }
    } catch (err) {
      notifyError(err ? err.response.data.message : err.message);
      toast.error(err.response.data.message || "An error occurred");
      closeDrawer();
    }
  };
  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    if (Object.keys(resData).length > 0) {
      setValue("title", resData.title[lang ? lang : "en"]);
    }
  };
  useEffect(() => {
    // Reset form fields if drawer is open
    if (isDrawerOpen) {
      for (const field of ['title', 'addressLine', 'area', 'city', 'state', 'pinCode', 'status', 'gst']) {
        setValue(field, '');
        clearErrors(field);
      }
      setSelectedProducts([]);
      setLanguage(lang);
      setResData({});
    }
  }, [isDrawerOpen, setValue, clearErrors, lang]);

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      setValue("title");
      setValue("products");
      setValue("status");
      setValue("gst");
      setValue("city");
      setValue("addressLine");
      setValue("area");
      setValue("state");
      setValue("pinCode");
      setLanguage(lang);
      setValue("language", language);

      clearErrors("title");
      clearErrors("products");
      clearErrors("status");
      clearErrors("gst");
      clearErrors("city");
      clearErrors("addressLine");
      clearErrors("area");
      clearErrors("state");
      clearErrors("pinCode");
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await StoreServices.getStoreById(id);
          if (res) {
            // console.log('res coupon', res);
            setResData(res);
            setValue("title", res.StoreName);
            setSelectedProducts(res.products);
            setValue("gst", res.gst);
            setValue("addressLine", res.addressLine);
            setValue("area", res.area);
            setValue("state", res.state);
            setStatus(res.status);
            setValue("city", res.city);
            setValue("pinCode", res.pinCode);
          }
        } catch (err) {
          notifyError(err ? err?.response?.data?.message : err.message);
        }
      })();
    }
  }, [id, setValue, isDrawerOpen, clearErrors, language, lang]);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 ">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("Update Store")}
          // description={t("UpdateCouponDescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("AddStore")}
          // description={t("AddCouponDescription")}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <Error error={errors.title} />
              <LabelArea label={t("Store Name : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  {...register("title", {
                    required: "Store Name is required!",
                  })}
                  name="title"
                  type="text"
                  placeholder="Store Name"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <Error error={errors.addressLine} />
              <LabelArea label={t("Address Line : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="addressLine"
                  {...register("addressLine", {
                    required: "Address Line is required!",
                  })}
                  type="text"
                  placeholder="Address Line"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <Error error={errors.area} />
              <LabelArea label={t("Area : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="area"
                  {...register("area", { required: "Area is required!" })}
                  type="text"
                  placeholder="Area"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <Error error={errors.city} />
              <LabelArea label={t("City : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="city"
                  {...register("city", { required: "City is required!" })}
                  type="text"
                  placeholder="City"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <Error error={errors.state} />
              <LabelArea label={t("State : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="state"
                  value={state}
                  {...register("state", { required: "State is required!" })}
                  type="text"
                  placeholder="State"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <Error error={errors.pinCode} />
              <LabelArea label={t("Pincode : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="pinCode"
                  value={pinCode}
                  {...register("pinCode", {
                    required: "Pin Code is required!",
                  })}
                  type="text"
                  placeholder="Pin Code"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Status : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="status"
                  {...register("status")}
                  type="text"
                  placeholder="Status"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("GST : ")} />
              <div className="col-span-8 sm:col-span-4">
                <Input
                  name="gst"
                  {...register("gst")}
                  type="text"
                  placeholder="GST"
                  onChange={handleChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />
              </div>
            </div>
            <DrawerButton
              id={id}
              title="Store"
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </Scrollbars>
    </>
  );
};
export default StoreRevDrawer;




import React, { useState, useRef } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const AddStoreForm = () => {
  const [formData, setFormData] = useState({
    storeName: "",
    addressLine: "",
    area: "",
    city: "",
    state: "",
    pinCode: "",
    landmark: "",
    storeOpenTime: "",
    storeCloseTime: "",
    radius: "",
    status: "open",
    manager: "",
    user: "",
    landline: "",
    latitude: 20.593684, // Updated latitude as per Google Maps
    longitude: 78.962880, // Updated longitude as per Google Maps
    storeImage: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, storeImage: [...formData.storeImage, file] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5055/api/store/add", formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const ClickableMap = () => {
    const markerRef = useRef(null);

    const handleDragEnd = (e) => {
      const marker = markerRef.current;
      if (marker) {
        const latlng = marker.getLatLng();
        setFormData({
          ...formData,
          latitude: latlng.lat,
          longitude: latlng.lng,
        });
      }
    };

    const customIcon = icon({
      iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    return (
      <MapContainer center={[formData.latitude, formData.longitude]} zoom={5} style={{ height: "400px", width: "100%", cursor: "crosshair" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[formData.latitude, formData.longitude]} ref={markerRef} draggable={true} icon={customIcon} eventHandlers={{ dragend: handleDragEnd }}>
          <Popup>
            Latitude: {formData.latitude}, Longitude: {formData.longitude}
          </Popup>
        </Marker>
      </MapContainer>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Existing form fields */}
      <ClickableMap />

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddStoreForm;
