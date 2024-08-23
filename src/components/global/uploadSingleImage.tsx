'use client';
import { SingleImageDropzone } from '@/components/ui/singleImageDropzone';
import * as React from 'react';
import { useEdgeStore } from '../../lib/edgestore';
import Image from 'next/image';


interface editPicProps{
  handleProfileImageChange: (changedProfileImageUrl: string) => void;
}

export default function SingleImageUpload({handleProfileImageChange}: editPicProps) {
  const [file, setFile] = React.useState<File>();
  const { edgestore } = useEdgeStore();
  const [profileUrl, setProfileUrl] = React.useState<string>('');
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    console.log('profileUrl: ', profileUrl);
    handleProfileImageChange(profileUrl);
  })
  return (
    <div className='flex flex-col justify-center p-4 items-center m-auto'>
      <span className='text-clip text-white text-xs'>upload-image</span>
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        onChange={(file) => {
          setFile(file);
        }}
      />
      {file &&(
        <div className='flex gap-4 text-white align-middle items-center'>
        <div className='h-[6px] w-44 rounded overflow-hidden border'>
          <div className='h-full bg-white transition-all duration-150'
            style={{ width: `${progress}%` }}
          >

          </div>
        </div><p>{progress}%</p>
      </div>
      )}


      {file && (
              <button
        className='mt-5 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-md transition-all duration-300'
        onClick={async () => {
          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                // you can use this to show a progress bar
                console.log(typeof (progress));
                setProgress(progress);
              },
            });
            // you can run some server action or api here
            // to add the necessary data to your database
            console.log(res);
            setProfileUrl(res.url);
          }
        }}
      >
        Upload
      </button>
        )}


    </div>
  );
}