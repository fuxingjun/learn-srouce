import path from "path";
import crc64 from "crc64-ecma182";

crc64.crc64File(path.join("/Users/jayden/Downloads/1111451893.rar"), function (err, ret) {
    console.log(err, ret);

    // a possible result:
    //
    //   undefined 5178350320981835788
});
