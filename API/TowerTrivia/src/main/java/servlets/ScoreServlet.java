/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import com.fasterxml.jackson.core.JsonProcessingException;
import facade.GameFacade;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Luis Araujo
 */
@WebServlet(name = "ScoreServlet", urlPatterns = {"/Score"})
public class ScoreServlet extends HttpServlet {

    
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //Al hacer un get, me traere mi score
        PrintWriter out = response.getWriter();
        GameFacade gameFacade = new GameFacade();
        try {
            out.print(gameFacade.getListRanking(request)); 
        } catch (SQLException | CloneNotSupportedException ex) {
        } 
        
    }

        @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, JsonProcessingException {
        PrintWriter out = response.getWriter();  
        GameFacade gameFacade = new GameFacade();
        try {
            out.print(gameFacade.updateScore(request)); 
        } catch (SQLException | CloneNotSupportedException ex) {
        } 
    }
        
}
