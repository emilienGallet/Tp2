package master.dsc.pwa.tp2.entity;

import java.util.List;

public interface VegetableRep {
		public List<Vegetable> findAll();
		public void add(Vegetable v);
}