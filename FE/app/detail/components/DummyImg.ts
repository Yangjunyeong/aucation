export type imgData = {
    label:string;
    alt: string;
    url: string;
}

export type imgDatalist = {
  imgDatalist: imgData[]
}


const imageDataList:imgData[] = [
    {
      label: "Image 1",
      alt: "image1",
      url: "https://cdn.newspenguin.com/news/photo/202001/317_1641_1348.png",
    },
  
    {
      label: "Image 2",
      alt: "image2",
      url: "https://cdn.thecolumnist.kr/news/photo/202302/1885_4197_221.jpg",
    },
  
    {
      label: "Image 3",
      alt: "image3",
      url: "https://cdn.newspenguin.com/news/photo/202001/317_1641_1348.png",
    },
  
    {
      label: "Image 4",
      alt: "image4",
      url: "https://cdn.thecolumnist.kr/news/photo/202302/1885_4197_221.jpg",
    },
  
    {
      label: "Image 5",
      alt: "image5",
      url: "https://cdn.newspenguin.com/news/photo/202001/317_1641_1348.png",
    },
  ];
  
  export default imageDataList;