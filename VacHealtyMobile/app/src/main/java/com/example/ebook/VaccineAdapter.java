package com.example.ebook;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class VaccineAdapter extends RecyclerView.Adapter<VaccineAdapter.Viewholder> {

    private Context context;
    private ArrayList<Vaccine> vaccinesArrayList;

    // Constructor
    public VaccineAdapter(Context context, ArrayList<Vaccine> vaccinesArrayList) {
        this.context = context;
        this.vaccinesArrayList = vaccinesArrayList;
    }

    @NonNull
    @Override
    public VaccineAdapter.Viewholder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // to inflate the layout for each item of recycler view.
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.card_layout, parent, false);
        return new Viewholder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull VaccineAdapter.Viewholder holder, int position) {
        // to set data to textview and imageview of each card layout
        Vaccine model = vaccinesArrayList.get(position);
        holder.vaccineNameTV.setText(model.getVaccineName());
        holder.vaccineRatingTV.setText("" + model.getVaccineRating());
        holder.vaccineIV.setImageResource(model.getVaccineImage());
    }

    @Override
    public int getItemCount() {
        // this method is used for showing number
        // of card items in recycler view.
        return vaccinesArrayList.size();
    }

    // View holder class for initializing of
    // your views such as TextView and Imageview.
    public class Viewholder extends RecyclerView.ViewHolder {
        private ImageView vaccineIV;
        private TextView vaccineNameTV, vaccineRatingTV;

        public Viewholder(@NonNull View itemView) {
            super(itemView);
            //courseIV = itemView.findViewById(R.id.idIVVaccineImage);
            vaccineIV = itemView.findViewById(R.id.idIVVaccineImage);
            vaccineNameTV = itemView.findViewById(R.id.idTVVaccineName);
            vaccineRatingTV = itemView.findViewById(R.id.idTVVaccineRating);
        }
    }
}
