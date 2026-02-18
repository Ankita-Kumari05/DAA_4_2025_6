#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;
class Solution {
  public:
    bool canplacecow(int s,vector<int>&stalls,int k)
    {
        int lastpos=stalls[0];
        int c=1;
        for(int i=1;i<stalls.size();i++)
        {
            if(stalls[i]-lastpos>=s)
            {
                c++;
                lastpos=stalls[i];
            }
            if(c==k)
            {
                return true;
            }
        }
        return false;
    }
    int aggressiveCows(vector<int> &stalls, int k) {
        sort(stalls.begin(),stalls.end());
        int low=1;
        int high=stalls.back()-stalls.front();
        int ans=0;
        while(low<=high)
        {
            int mid=low+(high-low)/2;
            if(canplacecow(mid,stalls,k))
            {
                ans=mid;
                low=mid+1;
            }
            else
            {
                high=mid-1;
            }
        }
        return ans;
    }
};