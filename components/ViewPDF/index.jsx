


import { Viewer } from "@react-pdf-viewer/core";


  // const [url, setUrl] = React.useState('');

export default function ViewPDF(url) {
  

// // Handle the `onChange` event of the `file` input
// const onChange = (e) => {
//     const files = e.target.files;
//     files.length > 0 && setUrl(URL.createObjectURL(files[0]));
// };

return (
    // <div>
    //     <input type="file" accept=".pdf" onChange={onChange} />

    //     <div style={{ height: '750px' }}>
    //         {url ? (
    //             <div
    //                 style={{
    //                     border: '1px solid rgba(0, 0, 0, 0.3)',
    //                     height: '100%',
    //                 }}
    //             >
    //                 <Viewer fileUrl={url} />
    //             </div>
    //         ) : (
    //             <div
    //                 style={{
    //                     alignItems: 'center',
    //                     border: '2px dashed rgba(0, 0, 0, .3)',
    //                     display: 'flex',
    //                     fontSize: '2rem',
    //                     height: '100%',
    //                     justifyContent: 'center',
    //                     width: '100%',
    //                 }}
    //             >
    //                 Preview area
    //             </div>
    //         )}
    //     </div>
    // </div>

    <div
    // style={{
    //     backgroundColor: '#fff',

    //     /* Fixed position */
    //     left: 0,
    //     position: 'fixed',
    //     top: 0,

    //     /* Take full size */
    //     height: '100%',
    //     width: '100%',

    //     /* Displayed on top of other elements */
    //     zIndex: 9999,

    //     display: 'flex',
    //     flexDirection: 'column',
    //     overflow: 'hidden',
    // }}
>
    {/* <!-- We will display viewer here --> */}
    <Viewer fileUrl={url} />
</div>
);

}