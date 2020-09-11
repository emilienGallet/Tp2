package master.dsc.pwa.tp2.controler;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import master.dsc.pwa.tp2.entity.Vegetable;
import master.dsc.pwa.tp2.entity.VegetableRep;
import master.dsc.pwa.tp2.entity.VegetableRepository;

@Controller
public class HomeCtrl {
	@Inject
	VegetableRepository a;
	
	@RequestMapping(path = {"/","/home"})
	public String index(Model m) {
		//TODO: process PUT request
		m.addAttribute("hi", "hello");
		//TempVegetableRep tmp = new TempVegetableRep();
		m.addAttribute("vege", a.findAll());
		m.addAttribute("veg",new Vegetable());
		return "index";
	}
	
	@RequestMapping(path = "/addvegetable", method = RequestMethod.POST)
	public String add(Vegetable v) {
		//a.add(v);
		a.save(v);
		return "redirect:/";
	}

}