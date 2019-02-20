/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package facade;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import model.RankingModel;
import model.ResponseModel;
import model.ScoreModel;
import model.SessionModel;
import model.UserModel;
import util.DBAccess;
import util.Encrypter;
import util.JacksonMapper;
import util.ModelCache;
import util.PropertiesReader;
import util.Validator;

/**
 *
 * @author Luis Araujo
 */
public class GameFacade {
    private DBAccess db;
    private PropertiesReader pReader;
    private JacksonMapper jackson;
    private Validator validator;
    private SessionModel sessionData;
    private ModelCache modelCache;
    
    public GameFacade(){
        db = null;
        pReader = PropertiesReader.getInstance();
        jackson = new JacksonMapper();
        validator = new Validator();
        modelCache = ModelCache.getInstance();
    }
    
    public String updateScore(HttpServletRequest request) throws SQLException, JsonProcessingException, CloneNotSupportedException, IOException{
        db = DBAccess.getConnection(pReader);
        ResultSet rs = null;
        ResponseModel<ScoreModel> res = modelCache.getModel("Response");
        HttpSession session = null;
        
        try{
            session = request.getSession();
            ScoreModel score = jackson.jsonToPojo(request,ScoreModel.class);
            SessionModel sm = (SessionModel) session.getAttribute("session");
            rs = db.execute(pReader.getValue("qs1"),score.isCorrect() ? 1:0,score.isCorrect()? 1:-1,sm.getId());
            if(rs.next()){
                score.setScore(rs.getInt("user_score"));
                res.setData(score);
                res.setStatus(200);
                res.setMessage(pReader.getValue("rs1"));
            }else{
                res.setStatus(500);
                res.setMessage(pReader.getValue("rs2"));
            }
            
            rs.close();
            db.close();
        }catch(Exception e){
            e.printStackTrace();
        }
        
        return jackson.pojoToJson(res);
    }
    
    public String getListRanking(HttpServletRequest request) throws SQLException, JsonProcessingException, CloneNotSupportedException, IOException{
        db = DBAccess.getConnection(pReader);
        ResultSet rs = null;
        ResponseModel<RankingModel> res = modelCache.getModel("Response");
        HttpSession session = null;
        
        try{
            session = request.getSession();
            RankingModel ranking = modelCache.getModel("Ranking");
            SessionModel sm = (SessionModel) session.getAttribute("session");
            rs = db.execute(pReader.getValue("qs2"));
            if(rs.next()){
                int i = 0;
                List<String> username = new ArrayList<>();
                List<Integer> score = new ArrayList<>();
                
                do{
                    i++;
                    
                    if(i<=10){
                        username.add(rs.getString("user_username"));
                        score.add(rs.getInt("user_score"));
                    }
                    
                    if(rs.getInt("user_id")==sm.getId()){
                        ranking.setPositionUser(i);
                        ranking.setYourScore(rs.getInt("user_score"));
                    }
                    
                }while(rs.next());
                ranking.setUsername(username);
                ranking.setScore(score);
                
                res.setData(ranking);
                res.setMessage(pReader.getValue("rs3"));
                res.setStatus(200);
            }else{
                res.setStatus(500);
                res.setMessage(pReader.getValue("rs2"));
            }
            
            rs.close();
            db.close();
        }catch(Exception e){
            e.printStackTrace();
        }
        
        return jackson.pojoToJson(res);
    }
    
}
