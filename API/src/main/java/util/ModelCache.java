
package util;

import java.util.HashMap;
import model.*;

public class ModelCache {
    private static ModelCache modelCache = new ModelCache();
    
    private HashMap<String, ModelClass> modelMap  = new HashMap<>();
    
    public <T> T getModel(String type) throws CloneNotSupportedException{
        return (T) modelMap.get(type).clone();
    }
    
    public static ModelCache getInstance(){
        return modelCache;
    }
    
    private ModelCache() {
        modelMap.put("Session",new SessionModel());
        modelMap.put("User",new UserModel());
        modelMap.put("Response", new ResponseModel<>());
        modelMap.put("Score",new ScoreModel());
        modelMap.put("Ranking",new RankingModel());
        System.out.println("Listo");
    }
}
