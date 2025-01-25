import React, { useState } from 'react';

type uploadProps={
    passedImage:(img:string)=> Promise<unknown>;
}

const SingleFileUploader = (props:uploadProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const reader = new FileReader();
  const handleUpload = async () => {
    reader.onloadend = () => {

      if (reader.result != null && typeof reader.result === "string"){
        props.passedImage(reader.result);
      } 
    };
    reader.readAsDataURL(file as File);
  };

  return (
    <>
      <div className="input-group">
        <input id="file" type="file" onChange={handleFileChange} accept='image/*' />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <button 
          onClick={handleUpload}
          className="submit"
        >Upload a file</button>
      )}
    </>
  );
};

export default SingleFileUploader;