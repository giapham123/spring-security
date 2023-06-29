package com.example.demoSecurity.apiTest.services.impl;

import com.example.demoSecurity.Config.ResourceConfigurations;
import com.example.demoSecurity.Shared.ResponseObject;
import com.example.demoSecurity.apiTest.mappers.ProductMapper;
import com.example.demoSecurity.apiTest.model.ProductModel;
import com.example.demoSecurity.apiTest.services.IProductService;
import org.apache.commons.io.FileUtils;
import org.mybatis.guice.transactional.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class ProductService implements IProductService {

    @Autowired
    ProductMapper productMapper;

    @Autowired
    private ResourceConfigurations configurations;


    @Override
    @Transactional
    public ResponseObject insertProduct(MultipartFile[] images,ProductModel productModel) {
        ResponseObject rs = new ResponseObject();
        List<String> imagesString = new ArrayList<>();
        int count = 0;
        int id =0;
        Path storage = configurations.getReportStorage(getCurrentRequest());
        for (MultipartFile file : images) {
            try {
                if (file.isEmpty()) {
                    continue; //next pls
                }
                String name = file.getOriginalFilename();
                String randomID = UUID.randomUUID().toString();
                String fileName = randomID.concat(name.substring(name.lastIndexOf(".")));
                if(count == 0){
                    count++;
                    productModel.setImage(fileName);
                    productMapper.insertProduct(productModel);
                    id = productModel.getProductId();
                }
//                file.transferTo(new File(storage.toString(),fileName)); //Save images to tomcat server
                productMapper.insertImages(id, fileName);

                //Save image to folder source
                String uploadDir = "./product-photos/";
                byte[] bytes = file.getBytes();
                Path path = Paths.get(uploadDir + fileName);
                Files.write(path, bytes);
                imagesString.add(fileName);
                //End Save image to folder source

            } catch (Exception e) {
                if (e instanceof FileAlreadyExistsException) {
                    throw new RuntimeException("A file of that name already exists.");
                }
                System.out.println(e);
                throw new RuntimeException(e.getMessage());
            }
        }
        productModel.setImages(imagesString);
        rs.setSuccess(true);
        rs.setMessage("Upload Success");
        rs.setData(productModel);
        return rs;
    }

    @Override
    public ResponseEntity<byte[]> getImage(String fileNm) {
        Path storage = configurations.getReportStorage(getCurrentRequest());
        byte[] image = new byte[0];
        try {
            image = FileUtils.readFileToByteArray(new File(storage.resolve(fileNm).toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
    }

    public static HttpServletRequest getCurrentRequest() {
        try {
            RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
            if (requestAttributes instanceof ServletRequestAttributes)
                return ((ServletRequestAttributes) requestAttributes).getRequest();
        } catch (Exception e) {
            // Ignore case
        }
        return null;
    }

}
