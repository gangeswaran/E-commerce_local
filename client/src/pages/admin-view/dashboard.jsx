import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  console.log(uploadedImageUrl, "uploadedImageUrl");

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  // Insights
  const totalImages = featureImageList ? featureImageList.length : 0;
  const imageStatusMessage =
    totalImages > 0
      ? `You currently have ${totalImages} featured images uploaded.`
      : "No featured images uploaded yet.";

  return (
    <div className="p-6">
      {/* Welcome Message */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Welcome to the Admin Dashboard
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Here, you can manage and upload feature images for your site.
      </p>

      {/* Insights Section */}
      <div className="mb-6 p-4 bg-blue-100 rounded-md">
        <h2 className="text-xl font-semibold text-blue-600">Dashboard Insights</h2>
        <p className="text-lg text-gray-700">{imageStatusMessage}</p>
      </div>

      {/* Image Upload Section */}
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>

      {/* Display Feature Images */}
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0 ? (
          featureImageList.map((featureImgItem, index) => (
            <div key={index} className="relative">
              <img
                src={featureImgItem.image}
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No images to display.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
