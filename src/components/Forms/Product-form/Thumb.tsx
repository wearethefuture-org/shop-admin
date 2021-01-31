
import React from 'react';

interface ThumbFiles {
    files: Array<any>
}
const Thumb: React.FC<ThumbFiles> = ({files}) => {
    return (
        <div>
            {
                files.map((file: any, index) => (
                <img src={URL.createObjectURL(file)}
                    key={index}
                    alt={file.name}
                    className="img-thumbnail mt-2"
                    height={200}
                    width={200} />))
            }
        </div>
    );
}

export default Thumb;