package com.example.demoSecurity.apiTest.mappers;
import com.example.demoSecurity.apiTest.model.ProductModel;
import com.example.demoSecurity.apiTest.model.TestApiModel;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ProductMapper {
    int insertProduct(ProductModel productModel);

    int insertImages(@Param("productId") Integer productId, @Param("imageUrl") String imageUrl );

    int deleteProduct(@Param("productId") Integer productId);

    int deleteImage(@Param("productId") Integer productId);

    int updateForPublish(@Param("productId") Integer productId);

}
