package com.example.demoSecurity.apiTest.mappers;
import com.example.demoSecurity.apiTest.model.ProductModel;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface DetailProductMapper {
    ProductModel getDetailProduct(@Param("productId") Integer productId);

    List<String> getLsImages(@Param("productId") Integer productId);

    List<ProductModel> getRelatedProduct(@Param("cateCd") String cateCd);
}
