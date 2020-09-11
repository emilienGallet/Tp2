package master.dsc.pwa.tp2.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Vegetable {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long id;
	String name;
	String color;
	Double price;
	
	public Vegetable() {
		// TODO Auto-generated constructor stub
	}

	public Vegetable(String name, String color, Double d) {
		super();
		this.name = name;
		this.color = color;
		this.price = d;
	}
	
}