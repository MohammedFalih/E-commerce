package com.example.e_commerce.service.customer;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.e_commerce.dto.CartItemDTO;
import com.example.e_commerce.dto.OrderDTO;
import com.example.e_commerce.dto.ProductDTO;
import com.example.e_commerce.entities.CartItems;
import com.example.e_commerce.entities.Order;
import com.example.e_commerce.entities.Product;
import com.example.e_commerce.entities.User;
import com.example.e_commerce.enums.OrderStatus;
import com.example.e_commerce.repository.CartItemsRepository;
import com.example.e_commerce.repository.OrderRepository;
import com.example.e_commerce.repository.ProductRepository;
import com.example.e_commerce.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final ProductRepository productRepository;

    private final OrderRepository orderRepository;

    private final CartItemsRepository cartItemsRepository;

    private final UserRepository userRepository;

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream().map(Product::getProductDTO).collect(Collectors.toList());

    }

    @Override
    public List<ProductDTO> searchProduct(String title) {
        return productRepository.findAllByNameContaining(title).stream().map(Product::getProductDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ResponseEntity<?> addProductToCart(CartItemDTO cartItemDTO) {
        Order pendingOrder = orderRepository.findByUserIdAndOrderStatus(cartItemDTO.getUserId(), OrderStatus.PENDING);
        Optional<CartItems> optionalCartItem = cartItemsRepository.findByUserIdAndProductIdAndOrderId(
                cartItemDTO.getUserId(), cartItemDTO.getProductId(), pendingOrder.getId());

        if (optionalCartItem.isPresent()) {
            CartItemDTO productAlreadyExist = new CartItemDTO();
            productAlreadyExist.setProductId(null);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(productAlreadyExist);
        } else {
            Optional<Product> optionalProduct = productRepository.findById(cartItemDTO.getProductId());
            Optional<User> optionalUser = userRepository.findById(cartItemDTO.getUserId());

            if (optionalProduct.isPresent() && optionalUser.isPresent()) {
                Product product = optionalProduct.get();
                CartItems cartItem = new CartItems();
                cartItem.setProduct(product);
                cartItem.setUser(optionalUser.get());
                cartItem.setQuantity(1L);
                cartItem.setOrder(pendingOrder);
                cartItem.setPrice(product.getPrice());
                CartItems updatedCart = cartItemsRepository.save(cartItem);
                pendingOrder.setPrice(pendingOrder.getPrice() + cartItem.getPrice());
                pendingOrder.getCartItems().add(cartItem);
                orderRepository.save(pendingOrder);

                CartItemDTO updatedCartItemDTO = new CartItemDTO();
                updatedCartItemDTO.setId(updatedCart.getId());
                return ResponseEntity.status(HttpStatus.CREATED).body(updatedCartItemDTO);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or product not found");
            }
        }
    }

    @Override
    public OrderDTO getCartByUserId(Long userId) {
        Order pendingOrder = orderRepository.findByUserIdAndOrderStatus(userId, OrderStatus.PENDING);
        List<CartItemDTO> cartItemDTOList = pendingOrder.getCartItems().stream().map(CartItems::getCartItemDTO)
                .toList();
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setCartItemDTOList(cartItemDTOList);
        orderDTO.setAmount(pendingOrder.getPrice());
        orderDTO.setId(pendingOrder.getId());
        orderDTO.setOrderStatus(pendingOrder.getOrderStatus());
        return orderDTO;
    }

}
