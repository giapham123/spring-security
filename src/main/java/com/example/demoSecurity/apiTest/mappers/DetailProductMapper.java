package com.example.demoSecurity.apiTest.mappers;
import com.example.demoSecurity.apiTest.model.ProductModel;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface DetailProductMapper {
    int insertProduct(ProductModel productModel);

    int insertImages(@Param("productId") Integer productId, @Param("imageUrl") String imageUrl );
}
