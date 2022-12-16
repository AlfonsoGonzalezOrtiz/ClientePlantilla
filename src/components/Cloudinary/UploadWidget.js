import { useEffect,useRef } from "react";
import { Button} from "react-bootstrap";

const UploadWidget = () => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() =>{
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dcxme26dj',
            uploadPreset: 'xfqhdhea'

        }, function(error,result) {
            console.log(result);
        });

    },[])
    return(
        <Button onClick={() => widgetRef.current.open()}>
            Upload
        </Button>
    )
}

export default UploadWidget;