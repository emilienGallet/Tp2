package master.dsc.pwa.tp2.entity;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import lombok.Data;


@Data
@Component
public class TempVegetableRep implements VegetableRep {

	ArrayList<Vegetable> lV;
	
	
	public TempVegetableRep() {
		lV = new ArrayList<Vegetable>();
		lV.add(new Vegetable("b","red",3.2));
		lV.add(new Vegetable("c","blue",3.3));
		lV.add(new Vegetable("d","yellow",3.4));
		lV.add(new Vegetable("a","pink",3.1));
	}


	@Override
	public List<Vegetable> findAll() {
		return lV;
	}


	public ArrayList<Vegetable> getLV() {
		return lV;
	}


	@Override
	public void add(Vegetable v) {
		// TODO Auto-generated method stub
		this.lV.add(v);
	}

}