import docImg from "../assets/doc.jpg";

function Document({doc}){

    return(
        <a href={doc?.pdf_file}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-40 sm:w-45 md:w-48 rounded-lg shadow-lg overflow-hidden group cursor-pointer hover:shadow-2xl transition-shadow border border-black/10"
        >
            {/**Default doc img */}
            <div className="relative">
                <img src={docImg} alt="DocImg" className="w-full h-35 sm:h-38 md:h-44 object-cover"/>
            </div>

            <div className=" p-4 bg-black/19">
                <h4 className="text-md font-semibold truncate">{doc?.title}</h4>
                <h4 className="text-sm font-semibold">Upload Date:{doc?.uploaded_at}</h4>
            </div>
        </a>
    );

}

export default Document;
