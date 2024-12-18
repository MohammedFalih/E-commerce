package com.example.e_commerce.controller;

import java.io.IOException;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.e_commerce.dto.AuthenticationRequest;
import com.example.e_commerce.dto.AuthenticationResponse;
import com.example.e_commerce.entities.User;
import com.example.e_commerce.repository.UserRepository;
import com.example.e_commerce.service.user.UserService;
import com.example.e_commerce.utils.JwtUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletResponse;

@SuppressWarnings("unused")
@RestController
public class AuthenticationController {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    public static final String TOKEN_PREFIX = "Bearer ";

    public static final String HEADER_STRING = "Authorization";

    @PostMapping("/authenticate")
    public void createAuthenticationToken(
            @RequestBody AuthenticationRequest authenticationRequest,
            HttpServletResponse httpServletResponse)
            throws BadCredentialsException, DisabledException, IOException, Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect username or password.");
        } catch (DisabledException e) {
            httpServletResponse.sendError(HttpServletResponse.SC_NOT_ACCEPTABLE, "User is not activated");
            return;
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        User user = userRepository.findFirstByEmail(authenticationRequest.getUsername());
        final String jwt = jwtUtil.generateToken(authenticationRequest.getUsername());

        httpServletResponse.getWriter()
                .write(new JSONObject().put("UserId", user.getId()).put("role", user.getUserRole()).toString());

        httpServletResponse.addHeader("Access-Control-Expose-Headers", "Authorization");
        httpServletResponse.addHeader("Access-Control-Allow-Headers",
                "Authorization, X-PINGGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-Customheader");
        httpServletResponse.addHeader(HEADER_STRING, TOKEN_PREFIX + " " + jwt);

    }

}
