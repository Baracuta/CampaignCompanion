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
    };
    reader.readAsDataURL(file as File);
    props.passedImage (URL.createObjectURL(file as File));
    localStorage.setItem(URL.createObjectURL(file as File), URL.createObjectURL(file as File));
  };

  return (
    <>
      <div className="input-group">
        <input id="file" type="file" onChange={handleFileChange} />
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